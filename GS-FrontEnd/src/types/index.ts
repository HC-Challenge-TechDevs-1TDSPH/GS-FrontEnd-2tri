// Baseado em UsuarioTO.java
export interface Usuario {
    idUsuario: number;
    nome: string;
    username: string;
    email: string;
    senha?: string; // Opcional no front por segurança ao listar
    dataDeCadastro?: string; // Java LocalDate vira string ISO 'YYYY-MM-DD' no JSON
}

// Baseado em LoginTO.java
export interface LoginRequest {
    login: string;
    senha: string;
}

// Baseado em EmpresaTO.java
export interface Empresa {
    idEmpresa: number;
    razaoSocial: string;
    cnpj: string;
    emailDeContato: string;
    senha?: string;
}

// Baseado em HabilidadeTO.java
export interface Habilidade {
    idHabilidade: number;
    nomeHabilidade: string;
    descricao: string;
    categoria: string;
}

// Baseado em UsuarioHabilidadeTO.java (Relacionamento)
export interface UsuarioHabilidade {
    idRelacao: number;
    idUsuario: number;
    idHabilidade: number;
    statusRelacao: string;
    nivel: number; // ex: 1 a 5
    prioridade: number;
    dataDeRegistro?: string;
    nomeHabilidade?: string; 
}



// Baseado em CursoTO.java
export interface Curso {
    idCurso: number;
    nomeDoCurso: string;
    plataforma: string;
    linkExterno: string;
    cargaHoraria: number;
}

// Baseado em CursoHabilidadeTO.java
export interface CursoHabilidade {
    idCursoHabilidade: number;
    idHabilidade: number;
    idCurso: number;
    statusFocoPrincipal: string;
    modulo: string;
    nivelEnsinado: string;
    tempoDedicado: number;
}

// Baseado em DemandaTO.java (Vagas/Mercado)
export interface Demanda {
    idDemanda: number;
    idEmpresa: number;
    idHabilidade: number;
    prioridade: number;
    senioridade: string;
    statusRemoto: string;
    qtdVagas: number;
}

// Interface Auxiliar para o Gráfico do Dashboard (DTO Personalizado de Resposta)
export interface ComparativoSkill {
    nomeHabilidade: string; // Java provavelmente manda o nome
    nivelUsuario: number;   // 0 a 100
    nivelMercado: number;   // 0 a 100
}

// Interfaces Auxiliares para o Dashboard (Combinações que a API provavelmente retorna)
// Se a API retorna a habilidade completa dentro da demanda, usamos extends ou composição
export interface DemandaExpandida extends Demanda {
    nomeHabilidade?: string; // Campo extra caso o front precise exibir o nome
    nomeEmpresa?: string;
}