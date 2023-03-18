import Listener from "./listener.js";

import { x } from "./x.js";

new Listener().listen();

browser.action.onClicked.addListener(() => {
  close_other_tabs();
});

//> tabs
const get_tabs = (exclude_active, callback) => {
  browser.tabs.query(
    {
      ...(exclude_active && { active: false }),
      pinned: false,
      currentWindow: true,
    },
    (tabs) => {
      callback(tabs);
    }
  );
};

const close_other_tabs = () => {
  get_tabs(true, (tabs) => {
    for (const tab of tabs) {
      browser.tabs.remove(tab.id);
    }
  });
};

const close_adjacent_tabs = (close_direction) => {
  get_tabs(false, (tabs) => {
    const active_tab_i = tabs.find((tab) => tab.active).index;

    for (const tab of tabs) {
      let tab_to_remove_id = null;

      if (
        (close_direction === "right" && tab.index > active_tab_i) ||
        (close_direction === "left" && tab.index < active_tab_i)
      ) {
        tab_to_remove_id = tab.id;
      }

      if (tab_to_remove_id !== null) {
        browser.tabs.remove(tab_to_remove_id);
      }
    }
  });
};
//< tabs

//> counter
const set_tab_count = () => {
  browser.tabs.query({ currentWindow: true }, (tabs) => {
    browser.action.setBadgeText({ text: tabs.length.toString() });
  });
};

const set_badge_color = () => {
  browser.action.setBadgeBackgroundColor({ color: "#26b748" });
};

browser.tabs.onCreated.addListener(() => {
  set_tab_count();
});

browser.tabs.onRemoved.addListener(() => {
  set_tab_count();
});

browser.windows.onRemoved.addListener(() => {
  set_tab_count();
});

browser.windows.onFocusChanged.addListener(() => {
  set_tab_count();
});
//< counter

//> context menu items
const create_context_menu_item = (id) => {
  browser.contextMenus.create({
    id: id,
    title: x.msg(id),
    contexts: ["action"],
  });
};
//< context menu items

browser.commands.onCommand.addListener((command) => {
  if (command === "close_other_tabs") {
    close_other_tabs();
  } else if (command === "close_tabs_to_the_right") {
    close_adjacent_tabs("right");
  } else if (command === "close_tabs_to_the_left") {
    close_adjacent_tabs("left");
  }
});

browser.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "close_other_tabs") {
    close_other_tabs();
  } else if (info.menuItemId === "close_tabs_to_the_right") {
    close_adjacent_tabs("right");
  } else if (info.menuItemId === "close_tabs_to_the_left") {
    close_adjacent_tabs("left");
  }
});

create_context_menu_item("close_other_tabs");
create_context_menu_item("close_tabs_to_the_right");
create_context_menu_item("close_tabs_to_the_left");
set_badge_color();
set_tab_count();
