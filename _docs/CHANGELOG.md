# Changelog

All notable changes to MarkVue will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-12-19

### Fixed
- Fixed issue where opening markdown files from Windows Explorer would launch the app but not display the file content
- Added proper handling for command-line arguments when files are opened via file association
- Improved file opening timing to ensure window is fully loaded before displaying content
- Added single-instance lock to prevent multiple app instances and properly handle file opens when app is already running

## [1.0.0] - Initial Release

### Added
- Beautiful markdown viewer for Windows
- Dark and light theme support
- Syntax highlighting for code blocks
- Search functionality with match navigation
- Zoom controls (keyboard shortcuts and mouse wheel)
- File menu with open dialog
- About modal with author information
