"""Local SQLite checkpoint recovery; no external side effects."""
import sqlite3
import tempfile
from pathlib import Path

def resume(path, fail_after_retrieval=False):
    db = sqlite3.connect(path)
    try:
        with db:
            db.execute('CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY, state TEXT NOT NULL)')
            db.execute("INSERT OR IGNORE INTO jobs VALUES (1, 'new')")
        state = db.execute('SELECT state FROM jobs WHERE id=1').fetchone()[0]
        if state == 'new':
            with db:
                db.execute("UPDATE jobs SET state='retrieved' WHERE id=1")
            if fail_after_retrieval:
                raise RuntimeError('simulated crash after committed retrieval')
            state = 'retrieved'
        if state == 'retrieved':
            with db:
                db.execute("UPDATE jobs SET state='done' WHERE id=1")
        return db.execute('SELECT state FROM jobs WHERE id=1').fetchone()[0]
    finally:
        db.close()

def main():
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / 'checkpoint.sqlite'
        try:
            resume(path, fail_after_retrieval=True)
        except RuntimeError:
            db = sqlite3.connect(path)
            try:
                state = db.execute('SELECT state FROM jobs WHERE id=1').fetchone()[0]
            finally:
                db.close()
            assert state == 'retrieved'
            print('after crash:', state)
        else:
            raise AssertionError('expected simulated crash')
        assert resume(path) == 'done'
        assert resume(path) == 'done'
        print('resumed: done; repeated resume: done')

if __name__ == '__main__':
    main()
