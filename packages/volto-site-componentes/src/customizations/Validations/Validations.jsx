export function validateCPF(cpf) {
  cpf = cpf.toString();
  if (!cpf) return 'CPF não informado';

  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11) return 'CPF deve ter 11 dígitos';

  if (/^(\d)\1+$/.test(cpf)) return 'CPF inválido';

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return 'CPF inválido';

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return 'CPF inválido';

  return null;
}
