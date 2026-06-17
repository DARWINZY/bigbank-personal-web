import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://api.github.com/repos/DARWINZY/bigbank-personal-web/actions/runs?per_page=1"
req = urllib.request.Request(url, headers={"Accept": "application/vnd.github.v3+json"})
with urllib.request.urlopen(req, context=ctx) as response:
    data = json.loads(response.read().decode())
    run_id = data["workflow_runs"][0]["id"]
    print("Run ID:", run_id)

jobs_url = f"https://api.github.com/repos/DARWINZY/bigbank-personal-web/actions/runs/{run_id}/jobs"
req = urllib.request.Request(jobs_url, headers={"Accept": "application/vnd.github.v3+json"})
with urllib.request.urlopen(req, context=ctx) as response:
    jobs = json.loads(response.read().decode())["jobs"]
    failed_job = next((j for j in jobs if j["conclusion"] == "failure"), None)
    if failed_job:
        print("Failed Job ID:", failed_job["id"])
        log_url = f"https://api.github.com/repos/DARWINZY/bigbank-personal-web/actions/jobs/{failed_job['id']}/logs"
        req = urllib.request.Request(log_url, headers={"Accept": "application/vnd.github.v3+json"})
        try:
            with urllib.request.urlopen(req, context=ctx) as log_res:
                print(log_res.read().decode()[-2000:])
        except Exception as e:
            print("Could not fetch log:", e)
    else:
        print("No failed job found.")
