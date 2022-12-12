# eclipse README

This extension allows users of [the yuescript language](https://yuescript.org/) to compile their files to Lua easily. It also comes with support for [the LÖVE framework](https://love2d.org).

## Features

- Compiling yuescript files to lua with options for:

  - Generating minified code
  - Using tabs versus spaces
  - Copying of other resource files (e.g. ttf, png)

- Generating a new main.yue file for LÖVE projects

  - This can be configured in many different ways

## Requirements

You will need the yuescript program installed. It can be [found here](https://github.com/pigpigyyy/Yuescript/releases/latest). This extension can find the executable easily when its location is placed in your OS's PATH. Alternatively, you can give the full path to the binary in the settings.

## Extension Commands

This extension contributes the following commands:

- Eclipse: Build Project: Compile the current yue files to lua from the configured source directory to the configured output directory
- Eclipse: New LÖVE Project: Create a `main.yue` file based on a specific configuration. See `eclipse.mainFileContents` below.

## Extension Settings

This extension contributes the following settings:

- `eclipse.compactLuaCode`: Enable/disable compact Lua code generation.
- `eclipse.copyAltFiles`: Enable/disable copying files of matched extensions from `eclipse.includePatterns` to the configured output directory.
- `eclipse.includePatterns`: Array of file extensions that are valid for `eclipse.copyAltFiles`.
- `eclipse.ignorePatterns`: Array of regex patterns to ignore specific files and folders.
- `eclipse.mainFileContent`: String enum to determine how to generate `main.yue`.
- `eclipse.outputDirectory`: Name of the directory to output both compiled Lua files and resources matching `eclipse.includePatterns` to.
- `eclipse.saveOnCompile`: Enable/disable saving all files when compiling.
- `eclipse.saveStdoutLog`: Enable/disable yuescript output to the dedicated Output Channel.
- `eclipse.sourceDirectory`: Name of the directory containing source code and resources.
- `eclipse.useTabsOrSpaces`: String enum to determine if tabs or spaces are used for Lua file compilation.
- `eclipse.yuescriptPath`: Path to the yuescript binary, can be empty if in PATH.

## Known Issues

N/A

## Release Notes

### 0.1.0

Initial Release
