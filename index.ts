import Funcionario from "./classes/Funcionario"
import PromptSync from "prompt-sync"

const prompt = PromptSync()
const listaFuncionarios: Funcionario[] = []

function adicionarFuncionario(nome: string, cargo: string, taxaHoraria: number): void {
    let funcionario = new Funcionario(nome, cargo, taxaHoraria)

    listaFuncionarios.push(funcionario)
}

function totalHorasTrabalhadas(funcionario) {

    let totalHoras = 0

    funcionario.horasTrabalhadas.map((horas) => {
        totalHoras += horas
    })
    return totalHoras
}

function calcularINSS(funcionario) {
    let salarioBruto = calcularSalarioMensal(funcionario)
    let inss = 0

    if (salarioBruto > 4000.04) {
        inss = salarioBruto * 14 / 100
    } else if (salarioBruto > 2666.69) {
        inss = salarioBruto * 12 / 100
    } else if (salarioBruto > 1412.01) {
        inss = salarioBruto * 9 / 100
    } else {
        inss = salarioBruto * 7.5 / 100
    }

    if (inss > 908.85) {
        inss = 908.85
    }

    return inss
}

function calcularImpostoDeRenda(funcionario) {
    let salarioBruto = calcularSalarioMensal(funcionario)
    let impostoDeRenda = 0

    if (salarioBruto > 2112.00) {
        impostoDeRenda = salarioBruto * 7.5 / 100
    } else if (salarioBruto > 2826.65) {
        impostoDeRenda = salarioBruto * 15 / 100
    } else if (salarioBruto > 3751.06 && salarioBruto < 4664.68) {
        impostoDeRenda = salarioBruto * 22.5 / 100
    } else {
        impostoDeRenda = salarioBruto * 27.5 / 100
    }

    return impostoDeRenda
}

function gerarRelatorioPagamento() {
    console.log('---------- RELATÓRIO DE PAGAMENTO ---------- \n')

    listaFuncionarios.map((func) => {

        let salarioBruto = calcularSalarioMensal(func)
        let descontoINSS = calcularINSS(func)
        let descontoImpostoDeRenda = calcularImpostoDeRenda(func)

        console.log(`Nome: ${func.nome}`)
        console.log(`Nome: ${func.cargo}`)
        console.log(`Total de horas trabalhadas: ${totalHorasTrabalhadas(func)}`)
        console.log(`Total INSS: R$ ${descontoINSS.toFixed(2)}`)
        console.log(`Total Imposto de Renda: R$ ${descontoImpostoDeRenda.toFixed(2)}`)
        console.log(`Salário bruto: R$ ${salarioBruto.toFixed(2)}`)
        console.log(`Salário líquido: R$ ${(salarioBruto - descontoINSS - descontoImpostoDeRenda).toFixed(2)}`)
        console.log('--------------------\n')
    })
}

function gerenciarFolhaPagamento() {
    function exibirMenu() {
        console.log("\n--- Sistema de Folha de Pagamento ---")
        console.log("1 - Adicionar Funcionário")
        console.log("2 - Registrar Horas Trabalhadas")
        console.log("3 - Exibir Relatório de Pagamento")
        console.log("4 - Sair")
    }

    let opcao;

    do {
        exibirMenu();
        opcao = prompt("Digite a opção desejada: ");
        switch (opcao) {
            case "1":
                let id = Number(prompt("Digite o id do funcionário: "));
                let nome = prompt("Digite o nome do funcionário: ");
                let cargo = prompt("Digite o cargo do funcionário: ");
                let taxaHoraria = Number(prompt("Digite a taxa horária do funcionário: "));

                adicionarFuncionario(id, nome, cargo, taxaHoraria);
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
                gerarRelatorioPagamento();
                break;

            case "4":
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