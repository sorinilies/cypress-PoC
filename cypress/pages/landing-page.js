import BasePage from "./base-page"


const LandingPageLocators = {
    'searchIcon': '[data-testid="little-search-icon"]',
    'searchInput': '[data-testid="structured-search-input-field-query"]',
    'anywhereButton': 'button[data-index="0"]'
}


class LandingPage extends BasePage {
    // page specific methods here
}

export { LandingPageLocators, LandingPage}