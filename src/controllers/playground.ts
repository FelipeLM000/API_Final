import{
    verificarSenhaForte,
    converterParaBinario,
    mediaArray,
    ehPar,
    validarCEP,
    contarPalavras,
} from "./controllers/ApiController"

console.log("------ Testes manuais ------\n")

console.log(" Senha forte:")
verificarSenhaForte("Abc@1234")
verificarSenhaForte("senhaFraca")

console.log("\n Conversão para binário:")
converterParaBinario(10)
converterParaBinario(255)

console.log("\n Média de array:")
mediaArray([5,10,15])
mediaArray([100,200,300])

console.log("\n Par ou ímpar:")
ehPar(4)
ehPar(7)

console.log("\n Validador de CEP: ")
validarCEP("12345678")
validarCEP("12A4567")

console.log("\n Contador de palavras:")
contarPalavras("Isso é um teste simples")
contarPalavras("  Espaços  extras  ")
