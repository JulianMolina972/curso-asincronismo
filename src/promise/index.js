//promesas

/*Las promesas tienen tres estados:
-Pending: Una promesa inicia en esté estado:
-Fulfilled: Cuando se resuelve exitosamente. .then(va => …)
-Rejected: Si sucede algún error. .catch(err => …)*/
const somethingWillHappen = () => {
    return new Promise((resolve, reject) =>{
        if (true) {
            resolve('Hey!');
        } else {
            reject('Whooops!')
        }
    });
};

somethingWillHappen()
  .then(response => console.log(response))
  .catch(err => console.error(err));

const somethingWillHappen2 = () => {
    return new Promise((resolve, reject) => {
        if (true){
            setTimeout(() => {
                resolve('true');
            }, 2000);
        } else {
            const error = new Error('Whooop!');
            reject(error);
        }
    });

}

somethingWillHappen2()
    .then(response => console.log(response))
    .catch(err => console.error(err))


Promise.all([somethingWillHappen(), somethingWillHappen2()])
    .then(response => {
        console.log('Array of result', response);
    })
    .catch(err => {
        console.error(err);
    })
