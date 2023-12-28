import subprocess

def check_ping(host):
    try:
        subprocess.check_output(["ping", host])
        return True
    except subprocess.CalledProcessError:
        return False

def run_traceroute(host):
    try:
        result = subprocess.check_output(["tracert", host], universal_newlines=True, shell=True)
        return result
    except subprocess.CalledProcessError as e:
        print(f"Traceroute error: {e}")
        return f"Error: {e}"
 
target_host = "www.google.com"
 
ping_result = check_ping(target_host)
if ping_result:
    print(f"Ping to {target_host} successful!")
    traceroute_result = run_traceroute(target_host)
    print("\nTraceroute Result:")
    print(traceroute_result)
else:
    print(f"Unable to ping {target_host}.")
 

