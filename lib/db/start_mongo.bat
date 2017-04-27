SETLOCAL
SET rutaMongo=C:\"Program Files"\MongoDB\Server\3.4\bin\mongod
SET rutaData="../data/db"

if not exist %rutaData% mkdir %rutaData%

start %rutaMongo% --dbpath %rutaData% --directoryperdb

ENDLOCAL