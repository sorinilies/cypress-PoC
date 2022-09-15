import BasePage from "./base-page"


const FilterModalLocators = {
    entirePlaceCheckbox: 'input[name="Entire place"]',
    privateRoomCheckbox: 'input[name="Private room"]',
    showAllStaysButton: '[data-plugin-in-point-id*="FILTER_FOOTER_ALL_FILTERS:TAB_ALL_HOMES"] a'
}


class FilterModalPage extends BasePage {
    // page specific methods here
    setCheckboxLanguage (language) {
        return `input[name="${language}"]`
    }
}

export { FilterModalLocators, FilterModalPage }