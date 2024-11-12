# Archipelago layouts

You can choose the UI layout of Archipelago by updating the `layout` configuration in the `/frontend/src/config/config.ts` file.

Structure of the `layout` configuration attribute is as below:
```js
{
  ...
  layout: {
    name: 'layoutName', // Default is 'leftMenu'
    options: {
      layoutOption1: 'value1',
      layoutOption2: 'value2',
      ...
    }
  }
  ...
}
```

There are currently 2 layouts packaged by default in Archipelago:

## LeftMenu layout

![leftMenu layout](https://github.com/user-attachments/assets/98b67948-97a6-47b9-88d8-7a79f506c724)

This layout has a collapsible menu on the left side and a search form on the top bar.

There is currently no options for this layout.
It can be configured as below:
```js
{
  layout: {
    name: 'leftMenu',
    options: {}
  }
}
```

## TopMenu layout

![topMenu layout](https://github.com/user-attachments/assets/b0c957ec-48d6-483c-b9ab-b3d010627178)

This layout has a main horizontal menu in its top bar, and secondary dropdown menu at the top right corner. Content fills all window width, and a filter bar can be located at the left or right side, with search form inside.

Layout options are listed in the table below. All options are optional.

| Property           | Type                                        | Default           | Description                                                                                                                                         |
|--------------------|---------------------------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `sideBarPlacement` | `left` or `right`                           | `left`            | Indicates if the filter side bar should be located on the left or right side of the main content
| `logo`             | `string` or `{ url: string; alt: string; }` | no logo           | Customizes app logo on the left of the top bar. If no value, logo is not displayed. If a string is provided, it must be a valid relative path for the logo image. If an object is provided, it should contains `url` attribute for the relative path of the image, and `alt` attribute for accessibility alternative text
| `title`            | `boolean` or a React component              | default app title | Customizes app title in the top bar. If no value, or `true`, default app title is displayed. If value is `false`, no title is displayed. If a React component is provided, it is displayed instead of text title
| `mainMenu`         | array of `MainMenuItem` objects             | empty menu        | Customizes main horizontal menu in the top bar. See below for the MainMenuItem object details. It is recommanded to not have more than 4 main menu items.

MainMenuItem object properties:

| Property      | Type               | Default      | Description                                                                                                                                         |
|---------------|--------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `label`       | `string`           | **required** | Menu item label
| `link`        | `string`           | **required** | Menu item url
| `icon`        | `SvgIconComponent` | **required** | Menu item icon. It should be a MaterialUI icon component (see https://mui.com/material-ui/material-icons/)
| `mobileLabel` | `string`           | -            | If menu item label is too long for bottom navigation mobile view, it can be customized here for a shorter label
| `resource`    | `string`           | -            | Resource associated to menu item. If provided, it hides the resource in the secondary dropdown menu, and colors the bottom navigation item if current url matches
