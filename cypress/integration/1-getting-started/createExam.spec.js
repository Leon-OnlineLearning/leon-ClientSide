/// <reference types="cypress" />


describe('manage exam resources', () => {

    it('should create new exam', () => {
        cy.login('professor@test.com', '1234')
        cy.contains('Exams').click()
        cy.contains('add exam').click()

        // fill the form
        cy.get('input[name=title]').type('test exam')
        cy.get('select[name=courseId]').select('dummy course')

        cy.get('.my-3 > :nth-child(3) > .form-control').type('test question')
        cy.get(':nth-child(4) > :nth-child(2) > :nth-child(1) > .form-control')
            .type('choice one')

        cy.get(':nth-child(3) > :nth-child(1) > .form-control')
            .type('choice two')

        cy.contains('save').click()
    })
})
