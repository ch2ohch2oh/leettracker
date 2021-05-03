import schedule
import time
import threading
import subprocess
import update

def polling():
    subprocess.call(['python', 'update.py', '--pending_users'])

thread = threading.Thread(target=polling)
thread.start()

schedule.every().day.do(update.update_problems)
schedule.every(6).hours.do(update.update_active_users)

update.update_problems()
update.update_active_users()

while True:
    schedule.run_pending()
    time.sleep(1)