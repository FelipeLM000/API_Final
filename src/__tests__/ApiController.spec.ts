import request from "supertest";
import server from "../server";

describe("Testes da API", () => {
  it("Deve retornar uma saudação na rota /saudacao", async () => {
    const response = await request(server).get("/saudacao");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ mensagem: "Olá, bem-vindo à API!" });
  });
});

test("dois mais dois", () => {
  const valor = 2 + 2;

  // Verifica se o valor é maior que 3
  expect(valor).toBeGreaterThan(3);
  // Verifica se o valor é maior ou igual a 3.5
  expect(valor).toBeGreaterThanOrEqual(3.5);
  // Verifica se o valor é menor que 5
  expect(valor).toBeLessThan(5);
  // Verifica se o valor é menor ou igual a 4.5
  expect(valor).toBeLessThanOrEqual(4.5);

  // toBe e toEqual são equivalentes para números
  expect(valor).toBe(4); // Verifica se o valor é igual a 4
  expect(valor).toEqual(4); // Verifica se o valor é igual a 4
});

describe("Testes de Cadastro de  Aluno", () => {
  it("Deve cadastrar um novo aluno na rota /cadastrarAluno", async () => {
    const novoAluno = {
      nome: "Luccas Kayure Crisanto",
      email: "lukinhas.silva@example.com",
      matricula: "123466516519875",
    };

    const response = await request(server)
      .post("/cadastrarAluno")
      .send(novoAluno);

    // Verifica se o status é 201 (Created)
    expect(response.status).toBe(201);
    // Verifica se a resposta contém a mensagem de sucesso
    expect(response.body.message).toBe("Aluno cadastrado com sucesso.");
    // Verifica se a resposta contém o aluno com as mesmas propriedades
    expect(response.body.novoAluno).toHaveProperty("nome", novoAluno.nome);
    expect(response.body.novoAluno).toHaveProperty("email", novoAluno.email);
    expect(response.body.novoAluno).toHaveProperty(
      "matricula",
      novoAluno.matricula
    );
  });
});

describe("Testes da Listagem de alunos", () => {
  it("Deve listar todos os alunos na rota /listarTodosAlunos", async () => {
    const response = await request(server).get("/listarTodosAlunos");

    // Verifica se a resposta tem o status 200
    expect(response.status).toBe(200);
    // Verifica se a resposta contém um array de alunos
    expect(Array.isArray(response.body)).toBe(true);
    // Verifica se o array de alunos contém ao menos um aluno
    expect(response.body.length).toBeGreaterThan(0);
  });
});