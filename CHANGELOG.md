# Change Log

All notable changes to the "rust-analyzer-targets" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### Changed

- Settings updates are now stored to the workspace rather than global configuration
    - This is to better support immutable configurations

### Removed

- rust extension settings, which is deprecated
- deprecated rust-analyzer setting
