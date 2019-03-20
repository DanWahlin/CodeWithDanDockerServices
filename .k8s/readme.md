## To Test StorageClass reclaim policy

1. Create the following folder structure:

Mac/Linux: /tmp/data/db
Windows:   c:/temp/data/db

2. If you're on Windows go into mongo.deployment.yml and change the PVs local path to /c/temp/data/db. Save the file.

3. Start everything

    `kubectl create -f .k8s`

3. Wait until all the pods are available (check via http://localhost)
4. Get the name of the mongo pod.
5. Delete the mongo Pod: kubectl delete pod [mongo-pod-name]
6. Once the pod is deleted, run kubectl get pv and note the reclaim policy that's shown and the status (should show Bound since the policy was Retain
7. Delete everything else: `kubectl delete -f .k8s1`