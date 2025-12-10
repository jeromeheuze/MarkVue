function markdownViewer() {
  return {
    content: '',
    renderedContent: '',
    fileName: '',
    theme: localStorage.getItem('theme') || 'dark',
    searchQuery: '',
    matches: [],
    currentMatchIndex: -1,
    matchCount: 0,
    originalContent: '',
    
    init() {
      // Apply saved theme
      document.body.classList.add(`theme-${this.theme}`);
      
      // Configure marked
      marked.setOptions({
        highlight: function(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
          }
          return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
      });
      
      // Listen for file opens
      window.electronAPI.onFileOpened((event, data) => {
        this.content = data.content;
        this.fileName = data.name;
        this.searchQuery = '';
        this.renderMarkdown();
      });
      
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
          e.preventDefault();
          if (this.content && this.$refs.searchInput) {
            this.$refs.searchInput.focus();
            this.$refs.searchInput.select();
          }
        }
      });
    },
    
    renderMarkdown() {
      this.originalContent = marked.parse(this.content);
      this.renderedContent = this.originalContent;
      
      // Re-highlight code blocks after rendering
      // Use setTimeout to ensure DOM is updated after x-html binding
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
        // Re-apply search highlighting if search is active
        if (this.searchQuery) {
          this.performSearch();
        }
      }, 0);
    },
    
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.clearHighlights();
        this.matches = [];
        this.currentMatchIndex = -1;
        this.matchCount = 0;
        return;
      }
      
      // Wait for DOM to update
      setTimeout(() => {
        const contentElement = this.$refs.markdownContent;
        if (!contentElement) return;
        
        // Clear previous highlights
        this.clearHighlights();
        
        const query = this.searchQuery.trim();
        const regex = new RegExp(this.escapeRegex(query), 'gi');
        
        // Find all text nodes (excluding code blocks)
        const walker = document.createTreeWalker(
          contentElement,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              // Skip code blocks to preserve syntax highlighting
              if (node.parentElement.closest('pre, code')) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          },
          false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
          textNodes.push(node);
        }
        
        // Find all matches
        this.matches = [];
        textNodes.forEach(textNode => {
          const text = textNode.textContent;
          let match;
          while ((match = regex.exec(text)) !== null) {
            this.matches.push({
              node: textNode,
              index: match.index,
              length: match[0].length
            });
          }
        });
        
        this.matchCount = this.matches.length;
        this.currentMatchIndex = this.matchCount > 0 ? 0 : -1;
        
        // Apply highlights
        this.highlightMatches();
        
        // Update active highlight and scroll after DOM updates
        setTimeout(() => {
          const highlights = this.$refs.markdownContent?.querySelectorAll('.search-highlight');
          if (highlights) {
            this.updateActiveHighlight(highlights);
            this.scrollToMatch(highlights);
          }
        }, 0);
      }, 0);
    },
    
    highlightMatches() {
      if (this.matches.length === 0) return;
      
      // Group matches by node
      const nodeMatches = new Map();
      this.matches.forEach((match, globalIndex) => {
        if (!nodeMatches.has(match.node)) {
          nodeMatches.set(match.node, []);
        }
        nodeMatches.get(match.node).push({ ...match, globalIndex });
      });
      
      // Process each node with matches (process in reverse to maintain indices)
      nodeMatches.forEach((matches, textNode) => {
        const parent = textNode.parentElement;
        const text = textNode.textContent;
        
        // Sort matches by index in reverse order
        matches.sort((a, b) => b.index - a.index);
        
        // Build replacement nodes
        const fragment = document.createDocumentFragment();
        let lastIndex = text.length;
        
        matches.forEach(match => {
          // Text after this match
          if (lastIndex > match.index + match.length) {
            const afterText = document.createTextNode(
              text.substring(match.index + match.length, lastIndex)
            );
            fragment.insertBefore(afterText, fragment.firstChild);
          }
          
          // Highlighted match
          const highlight = document.createElement('mark');
          highlight.className = 'search-highlight';
          if (match.globalIndex === this.currentMatchIndex) {
            highlight.classList.add('search-highlight-active');
          }
          highlight.textContent = text.substring(match.index, match.index + match.length);
          fragment.insertBefore(highlight, fragment.firstChild);
          
          lastIndex = match.index;
        });
        
        // Text before first match
        if (lastIndex > 0) {
          const beforeText = document.createTextNode(text.substring(0, lastIndex));
          fragment.insertBefore(beforeText, fragment.firstChild);
        }
        
        // Replace the text node with the fragment
        parent.replaceChild(fragment, textNode);
      });
    },
    
    clearHighlights() {
      const contentElement = this.$refs.markdownContent;
      if (!contentElement) return;
      
      // Find all highlight elements and replace with text nodes
      const highlights = contentElement.querySelectorAll('.search-highlight');
      highlights.forEach(highlight => {
        const textNode = document.createTextNode(highlight.textContent);
        highlight.parentElement.replaceChild(textNode, highlight);
      });
      
      // Normalize text nodes to merge adjacent ones
      contentElement.normalize();
    },
    
    nextMatch() {
      const highlights = this.$refs.markdownContent?.querySelectorAll('.search-highlight');
      if (!highlights || highlights.length === 0) return;
      
      this.matchCount = highlights.length;
      this.currentMatchIndex = (this.currentMatchIndex + 1) % this.matchCount;
      this.updateActiveHighlight(highlights);
      this.scrollToMatch(highlights);
    },
    
    previousMatch() {
      const highlights = this.$refs.markdownContent?.querySelectorAll('.search-highlight');
      if (!highlights || highlights.length === 0) return;
      
      this.matchCount = highlights.length;
      this.currentMatchIndex = this.currentMatchIndex <= 0 
        ? this.matchCount - 1 
        : this.currentMatchIndex - 1;
      this.updateActiveHighlight(highlights);
      this.scrollToMatch(highlights);
    },
    
    updateActiveHighlight(highlights) {
      highlights.forEach((highlight, index) => {
        highlight.classList.toggle('search-highlight-active', index === this.currentMatchIndex);
      });
    },
    
    scrollToMatch(highlights) {
      if (this.currentMatchIndex < 0 || this.currentMatchIndex >= highlights.length) return;
      
      if (highlights[this.currentMatchIndex]) {
        highlights[this.currentMatchIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    },
    
    closeSearch() {
      this.searchQuery = '';
      this.clearHighlights();
      this.matches = [];
      this.currentMatchIndex = -1;
      this.matchCount = 0;
      // Re-render to restore original content
      this.renderMarkdown();
    },
    
    escapeRegex(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      document.body.classList.remove('theme-dark', 'theme-light');
      document.body.classList.add(`theme-${this.theme}`);
      localStorage.setItem('theme', this.theme);
    }
  };
}

