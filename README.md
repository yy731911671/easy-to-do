# easy-to-do

> A forum where you can discuss the latest news and remind the schedule

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

Dependencies that need to be installed：

​	`npm i axios -S  //http request`

## project description

### Directory Structure

```
|-- easy-to-do
	|-- src
        |-- api						request
        |-- assets                 	resource
        |-- components             	component
        |-- pages                  	pages
        |-- router              	route management
        |-- store                  	State  management
        |-- styles                  css resource
        |-- util                   	tools
        
```

### Introduction

Easy to-do is platform for UTA-BUPT exchange students. It provide the convenience for students to get school news, course information, and so on.

> The project uses the js language, the web app based on the vue h5 project, uses the vant UI framework, and the backend uses the Java language, based on the springboot framework.

[Front-end warehouse: https://github.com/yy731911671/easy-to-do](https://github.com/yy731911671/easy-to-do)

[Back-end warehouse: https://github.com/Chenshuwen-pro/easy_to_do](https://github.com/Chenshuwen-pro/easy_to_do)

### Function

#### User

​	Login

​	Register

​	Update password

#### News

​	Browser news

​	Post/Update/Delete news  (only super administrators and moderators have permissions)

​	Add comments

​	Delete comments (only super administrators and moderators have permissions)

#### To-do

​	Browser courses details, homework and activities

​	Add/Delete/Update courses, homework and activities

#### Authority

​	Add authority

​	Update authority

### Contributors

​	Feiyang Wang,

​	Heng Liu,

​	Yi Yang,

​	Shuwen Chen,

​	Tong Gui
