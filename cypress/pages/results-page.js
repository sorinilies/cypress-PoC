import BasePage from "./base-page"


const ResultsLocators = {
    resultCards: '[itemprop="itemListElement"]',
    cardTitles: 'div[role="group"] div[id*="title"]',
    cardRatings: 'div[role="group"] span[role="img"] :nth-child(2)',
    cardPrices: 'div[role="group"] div[style*="pricing"] > div > span > span',
    closeCardButton: 'button[aria-label="Close"]',
    filterButton: 'button[style*="filter"]',
    totalListingCountSpan: '[data-section-id="EXPLORE_STRUCTURED_PAGE_TITLE"] h1 span',
    paginationItems: '[aria-label="Search results pagination"] > div > a'
}


class ResultsPage extends BasePage {
    // page specific methods here
}

export { ResultsLocators, ResultsPage}