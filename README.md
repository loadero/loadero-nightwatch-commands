# loadero-nightwatch-commands

## Installation

Installation is as simple as running the following npm command:

```bash
npm install --save git+https://github.com/loadero/loadero-nightwatch-commands.git
```

Make sure you run it in the directory where your `package.json` file is located.
The command shown above will also add the dependency to your `package.json` file.
It can also be added manually in `dependencies` object as 
`git+https://github.com/loadero/loadero-nightwatch-commands.git`.

The latest tag will always be the most up-to-date version when 
compared to the commands used in Loadero environment.

## Usage

These Nightwatch custom commands were made to simplify local script development 
for usage in Loadero environment. By using these commands, you can write your 
Loadero script locally and then upload it to Loadero. This also allows for more 
rapid development because the script can be debugged and run locally.

To use the commands in your tests, you need to add this package as a plugin to 
your Nightwatch configuration file. For example, if your project has a 
`nightwatch.conf.js` file, you need to add the following line to it:

```javascript
plugins: ["loadero-nightwatch-commands"]
```

After that, all you have to do then is run `npm install` after which you will be
able to use the commands in your tests. For example:

```javascript
client => {
    const reallyLongPause = 5 * 60 * 1000; // 5 minutes

    client
        // Example of timing execution without specifying a timeout.
        .url("https://duckduckgo.com/")
        .timeExecution("locate_search_bar_and_wait", () => {
            client
                .waitForElementVisible("#search_form_input_homepage", 10 * 1000)
                .sendKeys("#search_form_input_homepage", "loadero")
                .click("#search_button_homepage")
                .waitForElementVisible("#r1-0 > div > h2", 10 * 1000)
                .pause(reallyLongPause);
        })
        .takeScreenshot("screenshot.png");
}
```

> **_NOTE:_**  In place of `client` you should use the argument that describes 
> the nightwatch client in your test. By default Loadero creates the template 
> using `client`. A lot of times `client` is also referred to as `browser`.

Not all commands behave the same way as they do in the Loadero environment. 
Some of them are modified to work in a local environment, such as `updateNetwork`
and `setRequestHeader`.

## Commands

The following table shows all available commands and whether there are any 
changes to how they function in a local environment.

| Command                   | Differences                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `ignoreAlert`             | No differences                                                                      |
| `performTimed`            | No differences                                                                      |
| `setFile`                 | Any local file can be used, migration to Loadero may require changing the file path |
| `setRequestHeader`        | No request header will be set                                                       |
| `setUserAgent`            | User agent won't be changed                                                         |
| `takeScreenshot`          | Screenshot will be saved locally in project root directory                          |
| `timeExecution`           | Execution time will be logged, but not saved                                        |
| `updateNetwork`           | Network settings will not be updated                                                |
| `waitForDownloadFinished` | Function will finish instantly and not wait for download to be finished             |

Full descriptions for how each function behaves in Loadero and their usage can 
be found in [Loadero wiki](https://wiki.loadero.com/nightwatch/custom-commands/)
page. To see the differences between local and Loadero environment, you can
compare the descriptions in the wiki to the differences mentioned in this README.
