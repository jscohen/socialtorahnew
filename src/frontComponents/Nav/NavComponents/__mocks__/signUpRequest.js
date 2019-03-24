
/** Mock for sign up request
 * @return = {Promise}
 * @param = {Object}
**/
export default function signUpRequest(params) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (params.email && params.password) {
        resolve(params.email);
      } else {
        reject(new Error('Invalid Input'));
      }
    });
  });
}
