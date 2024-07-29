import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";
import {dynamicWebTable} from '@pages/DynamicWebTable'

Given("A web browser is at Techlistic dynamic web table page", () => {
  cy.visit("https://www.techlistic.com/2017/02/automate-demo-web-table-with-selenium.html");
});

When("user gets no of rows and columns from dynamic web table and validates", () => {
  dynamicWebTable.getColumnList().its('length').then(($val)=>{
    let columnList = $val;
    cy.log(columnList)
  })
  
});



