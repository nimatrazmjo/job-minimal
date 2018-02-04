import {Injectable} from '@angular/core';

@Injectable()
export class MenuService  {

  menuItems: Array<any>;

  constructor() {
    this.menuItems = [];
  }

  addMenu(items: Array<{
    text: string,
    heading?: boolean,
    link?: string,
    icon?: string,
    alert?: string,
    color: string,
    submenu?: Array<any>
  }>, activeMenu = '') {
    items.forEach((item) => {
      var menu = activeMenu.split("/");
      if (menu.length > 1 && item.link === '/'+menu[1]) {
        item.link = activeMenu;
      }
      this.menuItems.push(item);
    });
  }

  getMenu() {
    return this.menuItems;
  }

}
