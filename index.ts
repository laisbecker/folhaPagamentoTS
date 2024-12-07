import Funcionario from "./classes/Funcionario"
import PromptSync from "prompt-sync"

const prompt = PromptSync()
const listaFuncionarios: Funcionario[] = []

function adicionarFuncionario(nome: string, cargo: string, taxaHoraria: number): void {
    let funcionario = new Funcionario(nome, cargo, taxaHoraria)

    listaFuncionarios.push(funcionario)
    console.log('Funcionário adicionado com sucesso!')
}

function exibirLista():void{
    console.log('---------- RELATÓRIO DE PAGAMENTO ---------- \n')
    listaFuncionarios.map((func) => {
        func.exibirInformacoes()
    })
}

function gerarRelatorioPagamento(): void {
    console.log('---------- RELATÓRIO DE PAGAMENTO ---------- \n')

    listaFuncionarios.map((func) => {

        console.log(`Nome: ${func.nome}`)
        console.log(`Cargo: ${func.cargo}`)
        console.log(`Total de horas trabalhadas: ${func.calcularTotalHoras()}`)
        console.log(`Total INSS: R$ ${func.calcularINSS()}`)
        console.log(`Total Imposto de Renda: R$ ${func.calcularImpostoDeRenda()}`)
        console.log(`Salário bruto: R$ ${func.calcularSalarioMensal()}`)
        console.log(`Salário líquido: R$ ${(func.calcularSalarioMensal() - func.calcularINSS() - func.calcularImpostoDeRenda()).toFixed(2)}`)
        console.log('--------------------\n')
    })
}

function gerenciarFolhaPagamento(): void {
    function exibirMenu(): void {
        console.log("\n--- Sistema de Folha de Pagamento ---")
        console.log("1 - Adicionar Funcionário")
        console.log("2 - Registrar Horas Trabalhadas")
        console.log("3 - Exibir Informações dos funcionários")
        console.log("4 - Exibir Relatório de Pagamento")
        console.log("5 - Sair")
    }

    let opcao;

    do {
        exibirMenu();
        opcao = prompt("Digite a opção desejada: ");
        switch (opcao) {
            case "1":
                let nome = prompt("Digite o nome do funcionário: ");
                let cargo = prompt("Digite o cargo do funcionário: ");
                let taxaHoraria = Number(prompt("Digite a taxa horária do funcionário: "));

                adicionarFuncionario(nome, cargo, taxaHoraria);
                break;

            case "2":
                let idFuncionario = (prompt("Digite o id do funcionário: "));
                let numHoras = Number(prompt("Digite o número de horas trabalhadas: "));

                let funcionarioExiste = false

                listaFuncionarios.map(func => {
                    if (func.id == idFuncionario) {
                        func.registrarHoras(numHoras);
                        funcionarioExiste = true
                    }
                })

                if(!funcionarioExiste){
                    console.log(`O funcionário com id ${idFuncionario} não existe.`)
                }

                break;

            case "3":
                exibirLista()
                break;

            case "4":
                gerarRelatorioPagamento();
                break;

            case "5":
                console.log("Saindo do sistema...");
                break;

            default:
                console.log("Opção inválida!");
        }
    } while (opcao != "4");
}

gerenciarFolhaPagamento();

//adicionarFuncionario(1, 'Laís', 'Analista de Suporte Jr', 8.5)
//registrarHoras(1, 8)
//registrarHoras(1, 6)
//adicionarFuncionario(2, 'Nat', 'Analista de Suporte Jr', 9)
//registrarHoras(2, 8)
//registrarHoras(2, 10)

//gerarRelatorioPagamento()

//console.log(listaFuncionarios)

//let total = calcularSalarioMensal(listaFuncionarios[0])
//console.log('Total do salário bruto: ' + total)
//let inss = calcularINSS(listaFuncionarios[0])
//console.log('Total do INSS: ' + inss)