class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();
        const elementoNumero = document.querySelector('#numero');
        const elementoSaldo = document.querySelector('#saldo');
        const elementoDataAniversario = document.querySelector('#dataAniversario');
        const elementoTipoDaConta = document.querySelector('#tipoConta');

        switch(elementoTipoDaConta.value) {
            case 'conta':
                const conta = new Conta(elementoNumero.value,
                    Number(elementoSaldo.value));
                this.repositorioContas.adicionar(conta);
                this.inserirContaNoHTML(conta);
                break;
            case 'contaBonificada':           
                const contaBonificada = new ContaBonificada(elementoNumero.value,
                    Number(elementoSaldo.value));
                this.repositorioContas.adicionar(contaBonificada);
                this.inserirContaNoHTML(contaBonificada);
                break;
            case 'poupanca':                 
                const poupanca = new Poupanca(elementoNumero.value, Number(elementoSaldo.value), elementoDataAniversario.value);
                this.repositorioContas.adicionar(poupanca);
                this.inserirPoupancaNoHTML(poupanca);
                break;
        }        

    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }

    inserirPoupancaNoHTML(poupanca) {
        const elementoPoup = document.createElement('p');
        elementoPoup.textContent = 'Poupança ' + poupanca.numero + ': ' + poupanca.saldo + ' Data de Aniversário: ' + poupanca.dataAniversario;
        const botaoApagar2= document.createElement('button');
        botaoApagar2.textContent = 'X';

        botaoApagar2.addEventListener('click', (event) => {
            this.repositorioContas.remover(poupanca.numero);
            event.target.parentElement.remove();
        });

        elementoPoup.appendChild(botaoApagar2);
        document.body.appendChild(elementoPoup);
    }


}
