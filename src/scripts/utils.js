/* 
bulma-notifications ya tiene su JS pero lo dejo como ejemplo

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
 */
