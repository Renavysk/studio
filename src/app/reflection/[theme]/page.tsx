'use client'; // Added 'use client'

export default function ReflectionPage({ params }: { params: { theme: string }}) {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Página de Reflexão</h1>
        <p className="text-lg text-muted-foreground">
          Reflexão para o tema: <span className="font-semibold">{params.theme}</span>
        </p>
        <img src="/jesus sorrindo.png" alt="Jesus Sorrindo" className="mx-auto my-4" style={{ maxWidth: '200px' }} />
        <p className="text-muted-foreground mt-2">
          Esta funcionalidade está temporariamente desativada para testes.
        </p>
        <p className="mt-4">
          <a href="/" className="text-primary hover:underline">Voltar para a página inicial de teste</a>
        </p>
      </div>
    </main>
  );
}
