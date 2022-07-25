export const updateStatus = () => {
  return (pending, fulfilled, rejected) => ({
    [pending]: (state, action) => {
      state.status = statusesConstansts.statusEnums.pending;
    },
    [fulfilled]: (state, action) => {
      state.status = statusesConstansts.statusEnums.fulfilled;
    },
    [rejected]: (state, action) => {
      state.status = statusesConstansts.statusEnums.rejected;
    },
  });
};
