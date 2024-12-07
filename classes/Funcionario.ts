import { randomUUID } from "crypto"

class Funcionario {
    id: string
    nome: string
    cargo: string
    taxaHoraria: number
    horasTrabalhadas: number[]

    constructor(nomeP: string, cargoP: string, taxaHorariaP: number) {
        this.id = randomUUID().substring(0, 4) //gerar id aleatória limitado a 4 caracteres
        this.horasTrabalhadas = []
        this.nome = nomeP
        this.cargo = cargoP
        this.taxaHoraria = taxaHorariaP
    }

    registrarHoras(numHoras: number): void {
        this.horasTrabalhadas.push(numHoras)
    }

    calcularTotalHoras():number {
        let totalHoras = 0
        this.horasTrabalhadas.map(hora => {
            totalHoras += hora
        })

        return totalHoras
    }

    calcularSalarioMensal(): number {
        return this.calcularTotalHoras() * this.taxaHoraria
    }
}


export default Funcionario