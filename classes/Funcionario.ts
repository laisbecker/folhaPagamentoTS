import { randomUUID } from "crypto"

class Funcionario {
    id: string
    nome: string
    cargo: string
    taxaHoraria: number
    horasTrabalhadas: number[]

    constructor(nomeP: string, cargoP: string, taxaHorariaP: number) {
        this.id = randomUUID().substring(0, 4) //gerar nº aleatório limitado a 4 caracteres
        this.horasTrabalhadas = []
        this.nome = nomeP
        this.cargo = cargoP
        this.taxaHoraria = taxaHorariaP
    }

    registrarHoras(idFuncionario: string, numHoras: number) {
        if (this.id == idFuncionario) {
            this.horasTrabalhadas.push(numHoras)
            return
        }

        console.log('ID do funcionário está incorreto')
    }

    calcularSalarioMensal(){
        let totalHoras = 0
        this.horasTrabalhadas.map(hora => {
            totalHoras += hora
        })
        return totalHoras * this.taxaHoraria
    }
}

export default Funcionario