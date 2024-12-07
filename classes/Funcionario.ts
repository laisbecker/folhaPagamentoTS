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

    calcularINSS(): number {
        let salarioBruto = this.calcularSalarioMensal()
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

    calcularImpostoDeRenda(): number {
        let salarioBruto = this.calcularSalarioMensal()
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
}


export default Funcionario