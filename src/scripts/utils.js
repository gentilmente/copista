export default function toggleModal() {
  console.log('hi');
  const btnLiveview = document.getElementById('toggle-modal');
  const modal = document.querySelector('.modal');
  const close = document.querySelector('.modal-close');

  btnLiveview.onclick = () => modal.classList.toggle('is-active');
  close.onclick = () => {
    modal.classList.toggle('is-active');
    //livePrev.stop();
  };
}

document.addEventListener('DOMContentLoaded', () => {
  (document.querySelectorAll('.notification .delete') || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener('click', () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
