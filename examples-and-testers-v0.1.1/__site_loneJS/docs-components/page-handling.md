# Page Handling with LoneJS

Page handling consists of
- Page Groups (html tags)
- Page Names  (html attribute)
- Endpoint starting with a # ("hash" symbol). For example:
  - `www.myBomblasticWebsite.com/#page2/setting`
  - `#page2/setting`

For a complete example and project files, visit [www.lonejs.tech/examples/page_handling](http://www.lonejs.tech/#examples/page_handling)

### Create an html "page" tag
```html
<HOMEp pageName="main-home"> Main Page </HOMEp>
```

### Set Active Page (activePage="true")
When creating a new page tag, you must give at least one of the pages an initial activePage attribute to be set as displayed, while the remaining tags of your new attribute will be hidden.
```html
<HOMEp pageName="main-home" activePage='true'> Main Page </HOMEp>
<HOMEp pageName="sign-in-home"> Main Page </HOMEp>
<HOMEp pageName="user-home"> Main Page </HOMEp>
```
**Note:** this is a proper example on how the `_PAGE_SET` method will toggle the page's display attribute as a user changes pages within you app.

**Warning:** If multiple tags are set as `activepage="true"`, each page will override the pervious. Meaning, the last page you set as active will be the only active page.
- In the code example below, only user-home tag will be displayed. The previous two will have the css display property, `display: none;`
```html
<HOMEp pageName="main-home" activePage='true'> Main Page </HOMEp>
<HOMEp pageName="sign-in-home" activePage='true'> Main Page </HOMEp>
<HOMEp pageName="user-home" activePage='true'> Main Page </HOMEp>
```

### Set for NO active page.
If you want to hide all of the tags; i.e.`display: none;`
you'll just need to declare ONE of the tags as `activePage='false'`.
```html
<HOMEp pageName="main-home" activePage='false'> Main Page </HOMEp>
<HOMEp pageName="sign-in-home"> Main Page </HOMEp>
<HOMEp pageName="user-home"> Main Page </HOMEp>
```
**Warning:** Failing to add the `activePage` attribute to at least one "page" tag will result in **ALL** tags being displayed.
- The example below would result in ALL tags being shown.
```html
<HOMEp pageName="main-home"> Main Page </HOMEp>
<HOMEp pageName="sign-in-home"> Main Page </HOMEp>
<HOMEp pageName="user-home"> Main Page </HOMEp>
```
