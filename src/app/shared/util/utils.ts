export const utils = {
  closeModal(idElement: string): void {
    const modalElement = document.getElementById(idElement);
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.classList.add('fade');
      modalElement.setAttribute('aria-hidden', 'true');
      modalElement.style.display = 'none';
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }
}
