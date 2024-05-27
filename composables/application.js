import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDocs, collection, addDoc, updateDoc, increment } from "firebase/firestore"

const evaluateApplication = async ( transcript, applicantEmail, campaignHandle, requirements) => {
    const { $db } = useNuxtApp();
    const toast = useToast();
    const data = await $fetch("/api/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { resume: transcript, requirements: requirements },
    });
    console.log(data)
    data.email = applicantEmail;

    await addDoc(collection($db, `campaigns/${campaignHandle}/applications`), data);
    await updateDoc(doc($db, "campaigns", campaignHandle), {
        scores: increment(parseInt(data.score)),
        applications: increment(1),
    })
    toast.add({ title: 'Application added!' })
}   

export const addApplication = async (formData, file, picture, email, campaignHandle, requirements) => {
    const { $storage } = useNuxtApp();
    
    const fileRef = storageRef($storage, 'applications/' + campaignHandle + '/' + email);
    const pictureRef = storageRef($storage, 'applications/' + campaignHandle + '/pictures/' + email);

    fetch('https://pdf-parse.vercel.app', {
        method: 'POST',
        body: formData
    }).then(response => response.text())
    .then(async text => {
        console.log(text)
        await evaluateApplication(text.trim(), email, campaignHandle, requirements);
    })

    uploadBytes(fileRef, file).then( async () => {
        
    });
    uploadBytes(pictureRef, picture).then( async () => {
        
    });
}

export const getApplications = async (campaignHandle) => {
    return new Promise( async (resolve) => {
        const { $db, $storage } = useNuxtApp();

        const applications = [];
        let count = 0;
        const applicationSnapshot = await getDocs(collection( $db, `campaigns/${campaignHandle}/applications`));
        applicationSnapshot.forEach( async (doc) => {
            applications.push(doc.data());
            console.log(applications)
            let top = applications.length - 1;
    
            applications[top].picture = await getDownloadURL(storageRef($storage, `applications/${campaignHandle}/pictures/${doc.data().email}`))
            applications[top].color_indicator = (() => {
                if(doc.data().score >= 8) return 'green';
                else if(doc.data().score >= 5) return 'yellow';
                else if(doc.data().score >= 1) return 'red';
            })();
            count++;
            if(count === applications.length) resolve(applications);
        })
        if(count === applications.length) resolve(applications);
    })
}