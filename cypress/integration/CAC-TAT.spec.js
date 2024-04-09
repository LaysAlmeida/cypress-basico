///<reference types ="Cypress"/>
describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    //Exercicio 1 e 2
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .type('Bruno')

        cy.get('#lastName')
            .type('Gomes')

        cy.get('#email')
            .type('emailteste@teste.com')

        cy.get('#open-text-area')
            .type('Lorem ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet.', { delay: 0 })

        cy.contains('form .button', 'Enviar')
            .click()

        cy.get('.success').should('be.visible')

    })

    //Exercicio 3
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName')
            .type('Bruno')

        cy.get('#lastName')
            .type('Gomes')

        cy.get('#email')
            .type('emailteste.com')

        cy.get('#open-text-area')
            .type('Lorem ipsum dolor sit amet.')

        cy.contains('form .button', 'Enviar')
            .click()

        cy.contains('Valide os campos obrigatórios!')

    })

    //Exercicio 4
    it('validar valor vazio após inserir valores não-numericos no campo de telefone', function () {
        cy.get('#firstName')
            .type('Bruno')

        cy.get('#lastName')
            .type('Gomes')

        cy.get('#email')
            .type('email@teste.com')

        cy.get('#phone')
            .type('dsfsdfsdfsd')
            .should('have.value', '')

        cy.get('#open-text-area')
            .type('Lorem ipsum dolor sit amet.')

        cy.contains('form .button', 'Enviar')
            .click()

        cy.contains('Valide os campos obrigatórios!')

    })

    //Exercicio 4
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .type('Bruno')

        cy.get('#lastName')
            .type('Gomes')

        cy.get('#email')
            .type('emailteste@teste.com')

        cy.get('#phone-checkbox')
            .click()

        cy.get('#open-text-area')
            .type('Lorem ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet, ipsum dolor sit amet.', { delay: 0 })

        cy.contains('form .button', 'Enviar')
            .click()

        cy.get('.error')
            .should('be.visible')
    })

    //Exercícios 5
    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Bruno')
            .should('have.value', 'Bruno')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Gomes')
            .should('have.value', 'Gomes')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('emailteste@teste.com')
            .should('have.value', 'emailteste@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')

    })

    //Exercício 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('form .button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    //Exercício 7
    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
    })

})
