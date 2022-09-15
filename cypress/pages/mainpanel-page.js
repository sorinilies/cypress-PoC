import BasePage from "./base-page"


const MainPanelLocators = {
    "searchLensButton": '[data-testid="structured-search-input-search-button"]',
    "queryResultsRows": 'div[id*="bigsearch-query-location-suggestion"] > div',
    "chooseDatesButton": 'button#tab--tabs--0',
    "imFlexibleButton": 'button#tab--tabs--1',
    "weekendButton": 'button#flexible_trip_lengths-weekend_trip'
}


class MainPanelPage extends BasePage {
        // page specific methods here
}

export { MainPanelLocators, MainPanelPage}