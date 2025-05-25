'use client'; // Added 'use client' for simplicity if it were to have interactions

export default function ThemesPage() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Página de Temas</h1>
        <p className="text-lg text-muted-foreground">
          Esta funcionalidade está temporariamente desativada para testes.
        </p>
        <p className="mt-4">
          <a href="/" className="text-primary hover:underline">Voltar para a página inicial de teste</a>
        </p>
      </div>
    </main>
  );
}
