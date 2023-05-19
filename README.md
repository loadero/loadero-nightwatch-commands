# loadero-nightwatch-commands

## Installation

Installation is as simple as running the following npm command:

```bash
npm install --save git+https://github.com/loadero/loadero-nightwatch-commands.git
```

Make sure you run it in the directory where your `package.json` file is located.
Command shown above will also add the dependency to your `package.json` file.
It can also be added manually in `dependencies` object as 
`git+https://github.com/loadero/loadero-nightwatch-commands.git`.

The latest tag (or master) always will be the most up-to-date version when 
compared to the commands used in Loadero environment.

## Usage

These Nightwatch custom commands were made to simplify local script development 
for usage in Loadero environment. By using these commands, you can write your 
Loadero script locally and then upload it to Loadero without any changes. This 
also allows for more rapid development because it can be debugged and ran 
locally. 

To use the commands in your tests, you need to add this package as a plugin to 
your Nightwatch configuration file. For example, if you are using 
`nightwatch.conf.js` file, you need to add the following line to it:

```javascript
plugins: ["loadero-nightwatch-commands"]
```

After that, you can use the commands in your tests. For example:

```javascript
client.takeScreenshot("login_page.png");
```

> **_NOTE:_**  In place of `client` you should use the argument that describes 
> the nightwatch client in your test. By default Loadero creates the template 
> using `client`. A lot of times `client` is also referred to as `browser`.

## Commands

Not all commands behave the same way as they do in Loadero environment. Some of 
them are modified to work in local environment. Such as `updateNetwork` and 
`setRequestHeader`. The following table shows all available commands and if they 
will behave the same in both environments.

| Command                   | Differences                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- |
| `ignoreAlert`             | No differences                                                                         |
| `performTimed`            | No differences                                                                         |
| `setFile`                 | Any local file can be used, Loadero constant can be used if the same file name is used |
| `setRequestHeader`        | No request header will be set                                                           |
| `setUserAgent`            | User agent won't be changed                                                             |
| `takeScreenshot`          | Screenshot will be saved locally in project root directory                             |
| `timeExecution`           | Execution time will be logged, but not saved                                           |
| `updateNetwork`           | Network settings will not be updated                                                   |
| `waitForDownloadFinished` | Function will finish instantly and not wait for download to be finished                |

Full descriptions for each function and it's usage can be found in 
[Loadero wiki](https://wiki.loadero.com/nightwatch/custom-commands/) page.
