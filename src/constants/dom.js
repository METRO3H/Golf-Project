
export const nav_bar_section = document.querySelector("#nav-bar")
export const main_section = document.querySelector("#main-content")

export const current_page = {

    Set_Title: function(new_title) {

      document.title = new_title;
    },
    Set_Description: function(new_description) {

      const meta_description = document.querySelector('meta[name="description"]');
      meta_description.setAttribute('content', new_description);
    }

  };
  