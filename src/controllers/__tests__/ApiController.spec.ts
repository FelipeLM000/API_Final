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

  expect(valor).toBeGreaterThan(3);
  expect(valor).toBeGreaterThanOrEqual(3.5);
  expect(valor).toBeLessThan(5);
  expect(valor).toBeLessThanOrEqual(4.5);

  expect(valor).toBe(4);
  expect(valor).toEqual(4); 
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

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Aluno cadastrado com sucesso.");
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

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

//testes atividade 05
