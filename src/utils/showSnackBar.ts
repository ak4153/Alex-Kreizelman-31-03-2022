function showSnackBar(enqueueSnackbar: Function, action: Function) {
  enqueueSnackbar("Couldn't fetch data", {
    variant: 'warning',
    preventDuplicate: true,
    action,
  });
}
export default showSnackBar;
