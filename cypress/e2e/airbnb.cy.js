import {LandingPageLocators} from "../pages/landing-page";
import {FilterModalLocators, FilterModalPage} from "../pages/filtermodal-page";
import {MainPanelLocators} from "../pages/mainpanel-page";
import {ResultsLocators} from "../pages/results-page";

const DESTINATION = "Spain";
const HOST_LANGUAGE = "Japanese";

const dayjs = require('dayjs');
let today = dayjs().format('MM/DD/YYYY');
let checkout = dayjs().add(4, 'day').format('MM/DD/YYYY');
let yesterday = dayjs().subtract(1, 'day').format('MM/DD/YYYY');
let filterModal = new FilterModalPage();

describe('airbnb e2e specs', () => {
    before(() => {
        // Step 1

        cy.visit("/", {
            // need to set headers or the browser will throw a 403 error
            headers: {
            "Accept": "application/json, text/plain, */*",
            "User-Agent": "axios/0.18.0"
            }
        })

        // wait for the last of the initial requests to finish, page fully loaded
        cy.intercept('https://www.airbnb.com/api/v2/user_markets*').as('pageLoad');
        cy.wait('@pageLoad');
    });
  
    it('should follow given user flow', () => {
        let listingName, listingPrice, listingRating, resultsCount, listingsCounter, listingsTotalPages;
        cy.get(LandingPageLocators.anywhereButton).click({force:true});

        //Step 2
        cy.get(LandingPageLocators.searchInput).type(DESTINATION);
        cy.get(MainPanelLocators.queryResultsRows).should("be.visible")
        cy.get(MainPanelLocators.queryResultsRows).contains(DESTINATION).click({force:true});
        cy.get(`[data-testid='calendar-day-${today}']`).click({force:true});
        cy.get(`[data-testid='calendar-day-${checkout}']`).click({force:true});

        //Step 3
        cy.get(`[data-testid='calendar-day-${today}']`).parent('td').should("have.attr", 'aria-label')
        .then(label => expect(label).to.match(/Selected check-in date/));        
        cy.get(`[data-testid='calendar-day-${checkout}']`).parent('td').should("have.attr", 'aria-label')
        .then(label => expect(label).to.match(/Selected checkout date/));
        cy.get(`[data-testid='calendar-day-${yesterday}']`).should("have.attr", "data-is-day-blocked", "true")

        //Step 4
        cy.get(MainPanelLocators.imFlexibleButton).click({force:true});
        cy.get(MainPanelLocators.weekendButton).click({force:true});

        //Step 5
        cy.get(MainPanelLocators.chooseDatesButton).click({force:true});
        cy.get(MainPanelLocators.searchLensButton).click({force:true});
        cy.waitForMapLoad();
        cy.get(ResultsLocators.resultCards).first().realHover();
        cy.contains('span', 'selected').should("exist");

        //Step 6
        cy.contains('span', "selected").click({force:true});
        cy.get(ResultsLocators.cardTitles).first().then( ($el) => {
            listingName = $el.text();
        });  
        cy.get(ResultsLocators.cardPrices).first().then( ($el) => {
            listingPrice = $el.text();
        });   
        cy.get(ResultsLocators.cardRatings).first().then( ($el) => {
            listingRating = $el.text();
        });

        cy.get(ResultsLocators.cardTitles).last().should(($el)=> {
            expect($el.text()).to.equal(listingName);
        });   
        cy.get(ResultsLocators.cardPrices).last().should(($el)=> {
            expect($el.text()).to.equal(listingPrice);
        });   
        cy.get(ResultsLocators.cardRatings).last().should(($el)=> {
            expect($el.text()).to.equal(listingRating);
        });

        //Step 7
        cy.get(ResultsLocators.closeCardButton).click({force:true});
        cy.get(ResultsLocators.filterButton).click({force:true});
        cy.get(FilterModalLocators.entirePlaceCheckbox).click();
        cy.get(FilterModalLocators.privateRoomCheckbox).click();
        cy.contains('Show more').click({force:true});

        //Step 8
        cy.get(filterModal.setCheckboxLanguage(HOST_LANGUAGE)).click();
        cy.get(FilterModalLocators.showAllStaysButton).click();
        cy.waitForMapLoad();
        
        cy.get(ResultsLocators.totalListingCountSpan).should("be.visible").then(($el)=> {
            resultsCount = $el.text();
            let parseCount = resultsCount.split(" ");
            resultsCount = parseInt(parseCount[0]);
        });

        cy.get(ResultsLocators.paginationItems).then(($list) => {
            listingsTotalPages=$list.length;
        });

        listingsCounter = 0;
        // Cypress does not like for loops, so I had to implement a recursive solution as a custom command
        cy.recursionLoop(times => {
            cy.get(ResultsLocators.resultCards).then(($list)=>{
                listingsCounter += parseInt($list.length);
                cy.get(ResultsLocators.nextPageButton).scrollIntoView().click({force:true});
                cy.waitForMapLoad();
            })
            return times < listingsTotalPages;

          });
        
        cy.get(ResultsLocators.nextPageButton).then(()=> {
            expect(resultsCount).to.equal(listingsCounter);
        })
    
    })

})
