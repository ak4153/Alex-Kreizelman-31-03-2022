function showSnackBar(
  enqueueSnackbar: Function,
  action: Function,
  message: string
) {
  enqueueSnackbar(message, {
    variant: 'warning',
    preventDuplicate: true,
    action,
  });
}
export default showSnackBar;
