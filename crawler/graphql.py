from python_graphql_client import GraphqlClient 

q_getUserProfile = '''
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    githubUrl
    profile {
      realName
      websites
      countryName
      company
      school
      aboutMe
      userAvatar
      reputation
      ranking
    }
  }
}
'''

q_getRecentSubmissionList = '''
query getRecentSubmissionList($username: String!, $limit: Int) {
  recentSubmissionList(username: $username, limit: $limit) {
    title
    titleSlug
    timestamp
    statusDisplay
    lang
  }
}
'''

q_questionTopicsList = '''
query questionTopicsList($questionId: String!, $orderBy: TopicSortingOption, $skip: Int, $query: String, $first: Int!, $tags: [String!]) {
  questionTopicsList(questionId: $questionId, orderBy: $orderBy, skip: $skip, query: $query, first: $first, tags: $tags) {
    ...TopicsList
  }
}

fragment TopicsList on TopicConnection {
  totalNum
  edges {
    node {
      post {
        creationDate
        author {
          username
        }
        }
      }
    }
  }
'''

def query(query: str, variables: dict, endpoint="https://leetcode.com/graphql"):
    '''Execute graphql query to leetcode graphql endpoint'''
    try: 
        client = GraphqlClient(endpoint=endpoint)
        data = client.execute(query=query, variables=variables)
        return data
    except:
        return None
