# Config Script for Sorghum Metabolic Atlas App
# Author: Garret Huntress <ghuntress@carnegiescience.edu>
# Description: Run by Cloud Build, pulls in environment variables
#     set by Cloud Build substitution or through Secret Manger
#     to define config variables for SMA

# Set Variable Defaults
PGSQL_PORT=5432

# Define Usage
function usage {
	cat <<EOM
Usage: $(basename "$0") [OPTIONS] CONF_FILE

  -t String	SMA App Authentication Token String (JWT Token) [REQUIRED]
  -m Password	SMA App Master Password [REQUIRED]
  -h HOST	PostgreSQL Server Hostname or IP [REQUIRED]
  -P Port	PostgreSQL Server Port [OPTIONAL]
  -d DB		PostgreSQL Database Name [REQUIRED]
  -u User	PostgreSQL User [REQUIRED]
  -p Password	PostgreSQL Password [REQUIRED]

EOM

	exit 2
}

# Handle Command Line Options
while getopts ":t:m:h:P:d:u:p:" options; do
	case "${options}" in
		t)
			AUTH_TOKEN="${OPTARG}"
			;;
		m)
			AUTH_MASTERPASS="${OPTARG}"
			;;
		h)
			PGSQL_HOST="${OPTARG}"
			;;
		P)
			PGSQL_PORT="${OPTARG}"
			;;
		d)
			PGSQL_DB="${OPTARG}"
			;;
		u)
			PGSQL_USER="${OPTARG}"
			;;
		p)
			PGSQL_PASS="${OPTARG}"
			;;
		*)
			usage
			;;
	esac
done
shift $(( OPTIND - 1 ))

# Handle Command Arguments
CONF_FILE="$1"

# File Checks
if [ "${CONF_FILE}" == "" ]; then
        usage
fi
if [ ! -e "app.sample.config.json" ]; then
	echo "Sample config not found.  Sample config is required"
	exit 3
fi

# Copy Sample Config to Target Config
cp -f app.sample.config.json "${CONF_FILE}"

# Do Config File Substitutions
if [ "${AUTH_TOKEN}" == "" ]; then
	echo "ERROR: AUTH_TOKEN is not set"
        usage
else
	sed -i "s;AUTH_TOKEN;${AUTH_TOKEN};g" "${CONF_FILE}"
fi
if [ "${AUTH_MASTERPASS}" == "" ]; then
	echo "ERROR: AUTH_MASTERPASS is not set"
        usage
else
	sed -i "s;AUTH_MASTERPASS;${AUTH_MASTERPASS};g" "${CONF_FILE}"
fi
if [ "${PGSQL_HOST}" == "" ]; then
	echo "ERROR: PGSQL_HOST is not set"
	usage
else
	sed -i "s;PGSQL_HOST;${PGSQL_HOST};g" "${CONF_FILE}"
fi
if [ "${PGSQL_PORT}" == "" ]; then
	echo "ERROR: PGSQL_PORT is not set"
	usage
else
	sed -i "s;PGSQL_PORT;${PGSQL_PORT};g" "${CONF_FILE}"
fi
if [ "${PGSQL_DB}" == "" ]; then
        echo "ERROR: PGSQL_DB is not set"
        usage
else
        sed -i "s;PGSQL_DB;${PGSQL_DB};g" "${CONF_FILE}"
fi
if [ "${PGSQL_USER}" == "" ]; then
	echo "ERROR: PGSQL_USER is not set"
	usage
else
	sed -i "s;PGSQL_USER;${PGSQL_USER};g" "${CONF_FILE}"
fi
if [ "${PGSQL_PASS}" == "" ]; then
	echo "ERROR: PGSQL_PASS is not set"
	usage
else
	sed -i "s;PGSQL_PASS;${PGSQL_PASS};g" "${CONF_FILE}"
fi

# Done
exit 0
