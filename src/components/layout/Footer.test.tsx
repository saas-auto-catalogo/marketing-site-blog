import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { Footer } from './Footer.js';

describe('Footer Component', () => {
  it('renders visible contact email link with mailto:contato@drivesync.me', () => {
    const html = renderToString(<Footer />);

    // Deve conter o texto do e-mail visível
    expect(html).toContain('contato@drivesync.me');

    // Deve conter o link mailto correspondente
    expect(html).toContain('href="mailto:contato@drivesync.me"');

    // Deve conter aria-label acessível para o canal de contato
    expect(html).toContain('aria-label=');
  });
});
