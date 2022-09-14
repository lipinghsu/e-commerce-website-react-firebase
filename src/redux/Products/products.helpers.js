import { firestore } from "../../firebase/utils";


export const handleAddProduct = product => {
    return new Promise((resolve, reject) =>{
        firestore.collection('products').doc().set(product).then(() =>{
            resolve()
        }).catch(error =>{
            console.log(error)
            reject(error)
        })
    })
}

export const handleFetchProducts = ({ filterType, startAfterDoc, persistProducts=[] }) => {
    return new Promise((resolve, reject) => {
        const pageSize = 12;
        let ref = firestore.collection('products').orderBy('createdDate').limit(pageSize);
        if(filterType){
            ref = ref.where('productCategory', '==', filterType);
        }
        // loadMore triggered. telling the API that the first (pageSize) documents is our starting point
        if(startAfterDoc){
            ref = ref.startAfter(startAfterDoc);
        }
        ref.get()
        .then(snapshot =>{
            const totalCount = snapshot.size;
            const data = [
                ...persistProducts,     // previous products that have already been shown.
                ...snapshot.docs.map(doc =>{
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                })
            ];
            resolve({
                data,
                queryDoc: snapshot.docs[totalCount - 1],
                isLastPage: totalCount < pageSize,
                
            }); 
        }).catch(error => {
            console.log(error)
            reject(error); 
        })
    });
}

export const handleDeleteProduct = documnetID =>{
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc(documnetID).delete().then(() =>{
            resolve();
        }).catch(error =>{
            reject(error);
        })
    });
}

export const handleFetchProduct = productID => {
    return new Promise((resolve, reject) => {
        firestore.collection('products').doc(productID).get().then(snapshot =>{
            if(snapshot.exists){
                resolve({
                    ...snapshot.data(),
                    documentID: productID,
                    productLoaded: true
                }
                );
            }
        }).catch(error => {
            reject(error);
        })
    })
}