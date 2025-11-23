// src/types/index.ts

// Baseado em HabilidadeTO.java
export interface Habilidade {
    idHabilidade: number;
    nomeHabilidade: string;
    descricao: string;
    categoria: string;
}

// Baseado em UsuarioHabilidadeTO.java
export interface UsuarioHabilidade {
    idRelacao: number;
    idUsuario: number;
    idHabilidade: number;
    statusRelacao: string;
    nivel: number;
    prioridade: number;
    dataDeRegistro?: string;
    
    // Campos Opcionais (Front-end Only)
    // Como o Java não manda o nome da skill nesse objeto, 
    // nós o adicionamos manualmente no front ou via JOIN no Java.
    nomeHabilidade?: string; 
}

// Baseado em DemandaTO.java
export interface Demanda {
    idDemanda: number;
    idEmpresa: number;
    idHabilidade: number;
    prioridade: number;
    senioridade: string;
    statusRemoto: string;
    qtdVagas: number;
}

// Baseado em CursoTO.java
export interface Curso {
    idCurso: number;
    nomeDoCurso: string;
    plataforma: string;
    linkExterno: string;
    cargaHoraria: number;
}

// Baseado em UsuarioTO.java
export interface Usuario {
    idUsuario?: number; // Opcional no cadastro (gerado pelo banco)
    nome: string;
    username: string;
    email: string;
    senha: string;
    dataDeCadastro?: string;
}

// Baseado em LoginTO.java
export interface LoginRequest {
    login: string;
    senha: string;
}

// Interface Auxiliar para Gráficos (Não existe no Java, é criada pelo Front)
export interface ComparativoSkill {
    nomeHabilidade: string;
    nivelUsuario: number;
    nivelMercado: number;
}